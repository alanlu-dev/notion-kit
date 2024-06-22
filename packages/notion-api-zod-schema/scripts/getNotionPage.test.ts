import * as dotenv from 'dotenv'
import { getNotionPage } from './getNotionPage'

// 全局加載環境變量
dotenv.config()

// 確保在所有測試之前環境變量已正確設置
beforeAll(() => {
  ;['NOTION_PAGE_ID', 'NOTION_DASHBOARD_ID'].forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`${envVar} is not defined in the environment variables`)
    }
  })
})

describe('getNotionPage', () => {
  let notionPage: Awaited<ReturnType<typeof getNotionPage>>
  let notionDashboard: Awaited<ReturnType<typeof getNotionPage>>

  beforeAll(async () => {
    try {
      notionPage = await getNotionPage(process.env.NOTION_PAGE_ID!)
      notionDashboard = await getNotionPage(process.env.NOTION_DASHBOARD_ID!)
    }
    catch (error) {
      console.error('Error fetching Notion page or dashboard:', error)
      throw error
    }
  })

  it('should return a page with contents', async () => {
    assert.strictEqual(notionPage.id.replaceAll('-', ''), process.env.NOTION_PAGE_ID)
  })

  // 假設添加對 notionDashboard 的測試
  it('should return a dashboard with contents', async () => {
    assert.strictEqual(notionDashboard.id.replaceAll('-', ''), process.env.NOTION_DASHBOARD_ID)
  })
})
