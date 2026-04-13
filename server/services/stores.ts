import type { Knex } from 'knex'
import * as dbStores from '../db/stores.js'
import * as dbStoreStock from '../db/store-stock.js'
import * as dbSales from '../db/sales.js'
import * as dbSaleItems from '../db/sale-items.js'
import * as dbParticipants from '../db/participants.js'
import db from '../db/connection.js'
import type { Store } from '@/models/stores.js'
import type {
  StoreSummaryBestseller,
  StoreSummaryTopEarner,
} from '@/models/store-summary.js'

type ProductTotals = {
  productId: number
  productName: string
  quantitySold: number
  revenueCents: number
  profitCents: number
}

function pickBestseller(
  totals: ProductTotals[],
): StoreSummaryBestseller | null {
  if (totals.length === 0) {
    return null
  }
  const best = totals.reduce((bestProduct, current) => {
    if (current.quantitySold > bestProduct.quantitySold) {
      return current
    }
    if (current.quantitySold < bestProduct.quantitySold) {
      return bestProduct
    }
    if (current.revenueCents > bestProduct.revenueCents) {
      return current
    }
    if (current.revenueCents < bestProduct.revenueCents) {
      return bestProduct
    }
    return current.productId < bestProduct.productId ? current : bestProduct
  })
  return {
    productId: best.productId,
    productName: best.productName,
    quantitySold: best.quantitySold,
    revenueCents: best.revenueCents,
  }
}

function pickTopEarner(totals: ProductTotals[]): StoreSummaryTopEarner | null {
  if (totals.length === 0) {
    return null
  }
  const best = totals.reduce((bestProduct, current) => {
    if (current.profitCents > bestProduct.profitCents) {
      return current
    }
    if (current.profitCents < bestProduct.profitCents) {
      return bestProduct
    }
    if (current.quantitySold > bestProduct.quantitySold) {
      return current
    }
    if (current.quantitySold < bestProduct.quantitySold) {
      return bestProduct
    }
    return current.productId < bestProduct.productId ? current : bestProduct
  })
  return {
    productId: best.productId,
    productName: best.productName,
    profitCents: best.profitCents,
    quantitySold: best.quantitySold,
  }
}

function calculateProductTotals(
  saleLines: Array<{
    productId: number
    productName: string
    quantity: number
    costCents: number
    lineTotalCents: number
  }>,
): {
  bestseller: StoreSummaryBestseller | null
  topEarner: StoreSummaryTopEarner | null
} {
  const productGroups = new Map<number, ProductTotals>()

  for (const line of saleLines) {
    const qty = Number.isFinite(line.quantity) ? line.quantity : 0
    const lineTotal =
      typeof line.lineTotalCents === 'number' &&
      Number.isFinite(line.lineTotalCents)
        ? line.lineTotalCents
        : 0
    const cost =
      typeof line.costCents === 'number' && Number.isFinite(line.costCents)
        ? line.costCents
        : 0
    const lineProfit = lineTotal - cost * qty

    let singleProductTotals = productGroups.get(line.productId)
    if (!singleProductTotals) {
      singleProductTotals = {
        productId: line.productId,
        productName:
          typeof line.productName === 'string' && line.productName.length > 0
            ? line.productName
            : 'Unknown',
        quantitySold: 0,
        revenueCents: 0,
        profitCents: 0,
      }
      productGroups.set(line.productId, singleProductTotals)
    }
    singleProductTotals.quantitySold += qty
    singleProductTotals.revenueCents += lineTotal
    singleProductTotals.profitCents += lineProfit
  }
  const allProductTotals = Array.from(productGroups.values())
  return {
    bestseller: pickBestseller(allProductTotals),
    topEarner: pickTopEarner(allProductTotals),
  }
}

export async function requireOpenStore(
  storeId: number,
  trx?: Knex.Transaction,
): Promise<Store> {
  const store = await dbStores.getStoreById(storeId, trx)
  if (!store) {
    throw new Error('Store not found')
  }
  if (store.endedAt != null) {
    throw new Error('Store has ended')
  }
  return store
}

export async function createStoreWithStock(
  categoryId: number,
  participantId: number,
) {
  return db.transaction(async (trx) => {
    const store = await dbStores.createStore(categoryId, participantId, trx)
    await dbStoreStock.seedStoreStock(store.id, categoryId, trx)
    return store
  })
}

export async function endStore(storeId: number) {
  return db.transaction(async (trx) => {
    const store = await dbStores.getStoreById(storeId, trx)
    if (!store) {
      throw new Error('Store not found')
    }
    if (store.endedAt != null) {
      throw new Error('Store already ended')
    }
    const sales = await dbSales.getSalesByStoreId(storeId, trx)
    const saleIds = sales.map((saleItem: { id: number }) => saleItem.id)
    let totalRevenueCents = 0
    let totalCostCents = 0
    if (saleIds.length > 0) {
      const items = await dbSaleItems.getSaleItemsForTotals(saleIds, trx)
      for (const item of items) {
        totalRevenueCents += item.lineTotalCents
        totalCostCents += item.costCents * item.quantity
      }
    }
    const profitCents = totalRevenueCents - totalCostCents
    const endedAt = new Date().toISOString()
    await dbStores.updateStoreTotals(
      storeId,
      { totalRevenueCents, totalCostCents, profitCents },
      endedAt,
      trx,
    )
    return dbStores.getStoreById(storeId, trx)
  })
}

export async function getStoreSummary(storeId: number) {
  const store = await dbStores.getStoreById(storeId)
  if (!store) {
    throw new Error('Store not found')
  }
  const stock = await dbStoreStock.getStoreStockByStoreId(storeId)
  const sales = await dbSales.getSalesByStoreId(storeId)
  const saleIds = sales.map((saleItem: { id: number }) => saleItem.id)
  let totalRevenueCents = 0
  let totalCostCents = 0
  let bestseller: StoreSummaryBestseller | null = null
  let topEarner: StoreSummaryTopEarner | null = null

  if (saleIds.length > 0) {
    const items = await dbSaleItems.getSaleItemsForTotals(saleIds)
    for (const item of items) {
      totalRevenueCents += item.lineTotalCents
      totalCostCents += item.costCents * item.quantity
    }

    const linesWithProducts = await dbSaleItems.getSaleItemsBySaleIds(saleIds)
    const highlights = calculateProductTotals(linesWithProducts)
    bestseller = highlights.bestseller
    topEarner = highlights.topEarner
  }

  const profitCents = totalRevenueCents - totalCostCents
  return {
    store,
    stock,
    totalRevenueCents,
    totalCostCents,
    profitCents,
    bestseller,
    topEarner,
  }
}

export async function getStoresForTeacherDashboard(classCode: string) {
  const cleanCode = classCode.trim()
  const classId = await dbParticipants.getClassIdByCode(cleanCode)

  if (classId == null) {
    throw new Error('Class not found')
  }

  return dbStores.getStoresByClassId(classId)
}
