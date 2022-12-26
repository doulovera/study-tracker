import { Client } from '@notionhq/client'

const client = new Client({ auth: process.env.NOTION_ACCESS_TOKEN || '' })

interface Api {
  databaseId: string
}

interface Entry extends Api {
  id?: string,
  title: string,
  hours: string,
}

export async function createEntry ({ databaseId, title, hours }: Entry) {
  return await client.pages.create({
    parent: {
      database_id: databaseId,
      type: 'database_id'
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: `${title} (${hours === '1' ? '1 hour' : `${hours} hours`})`
            }
          }
        ]
      },
      Course: {
        rich_text: [
          {
            text: {
              content: title
            }
          }
        ]
      },
      Hours: {
        number: Number(hours)
      }
    }
  })
}

type Filter = object | object[] | undefined

interface Query extends Api {
  filter?: Filter,
  sorts?: object[]
}

export async function queryDatabase ({ databaseId, filter, sorts }: Query) {
  try {
    return await client.databases.query({
      database_id: databaseId,
      // @ts-ignore
      filter,
      // @ts-ignore
      sorts
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}
