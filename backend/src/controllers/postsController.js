export const getAllPosts = (req, res) => {
  const posts = [
    { id: 1, title: "Hello World", content: "This is my first post." },
    {
      id: 2,
      title: "Docker + Express",
      content: "Running inside a container!",
    },
  ]
  res.json(posts)
}
