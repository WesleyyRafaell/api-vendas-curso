import { randomUUID } from 'crypto'
import { InMemoryRepository } from './in-memory.repository'

type StubModelProps = {
  id: string
  name: string
  price: number
  created_at: Date
  updated_at: Date
}

class StubInMemoryRepository extends InMemoryRepository<StubModelProps> {
  constructor() {
    super()
    this.sortableFields = ['name']
  }

  protected async applyFilter(
    items: StubModelProps[],
    filter: string | null,
  ): Promise<StubModelProps[]> {
    if (!filter) {
      return items
    }

    return items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase()),
    )
  }
}

describe('InMemoryRepository Unit Tests', () => {
  let sut: StubInMemoryRepository
  let model: StubModelProps
  let props: any

  beforeEach(() => {
    sut = new StubInMemoryRepository()

    const created_at = new Date()
    const updated_at = new Date()

    props = {
      name: 'test name',
      price: 10,
    }

    model = {
      id: randomUUID(),
      created_at,
      updated_at,
      ...props,
    }
  })

  it('should create a model', () => {
    const result = sut.create(props)
    expect(result.name).toStrictEqual('test name')
  })

  it('should inserts a new model', async () => {
    const result = await sut.insert(model)
    expect(result).toStrictEqual(sut.items[0])
  })
})
