import * as dbStores from '../db/stores.js'
import * as dbStoreStock from '../db/store-stock.js'
import * as dbSales from '../db/sales.js'
import * as dbSaleItems from '../db/sale-items.js'
import db from '../db/connection.js'

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
  if (saleIds.length > 0) {
    const items = await dbSaleItems.getSaleItemsForTotals(saleIds)
    for (const item of items) {
      totalRevenueCents += item.lineTotalCents
      totalCostCents += item.costCents * item.quantity
    }
  }
  const profitCents = totalRevenueCents - totalCostCents
  return {
    store,
    stock,
    totalRevenueCents,
    totalCostCents,
    profitCents,
  }
}
