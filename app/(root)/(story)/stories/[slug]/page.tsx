export default function StoryPage({ params }: { params: { slug: string }}) {
  return (
    <div className="">{params.slug}</div>
  )
}