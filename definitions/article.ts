export interface Article {
    id: string
    authorId: string
    title: string
    content: string
    description: string
    imageUrl: string | null
    createdAt: Date
    updatedAt: Date
    postedAt: Date | null
}