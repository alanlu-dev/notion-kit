import { getNotionDatabaseRows } from './getNotionDatabaseRows'

// 確保在所有測試之前環境變量已正確設置
beforeAll(() => {
  if (!process.env.NOTION_DATABASE_ID) {
    throw new Error('NOTION_DATABASE_ID is not defined in the environment variables')
  }
})

describe('getNotionDatabaseRows', () => {
  let rows: Awaited<ReturnType<typeof getNotionDatabaseRows>>

  beforeAll(async () => {
    try {
      rows = await getNotionDatabaseRows(process.env.NOTION_DATABASE_ID!)
    }
    catch (error) {
      console.error('Failed to get Notion database rows:', error)
      throw error
    }
  })

  it('should return a list of rows', async () => {
    expect(rows).toBeInstanceOf(Array)
    expect(rows.length).toBeGreaterThan(0) // 假設數據庫至少有一行數據
    // 可以添加更多針對 rows 內容的斷言
  })
})
