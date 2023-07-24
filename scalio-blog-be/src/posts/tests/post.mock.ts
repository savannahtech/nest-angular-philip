/*
mock implementation...
*/
export const getPostsMockData = [
    {
      id: 1,
      title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
      userId: 1
    }
  ];

export const PostNotFoundMock = {
    statusCode: 404,
    error: 'Not Found',
    message: 'Post with ID 1 not found',
};