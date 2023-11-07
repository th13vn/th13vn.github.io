const graphqlEndpoint = 'https://api.github.com/graphql';
const authToken = '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'; //READ DISCUSSION ONLY

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${authToken}`, // Replace 'Bearer' with the appropriate authorization method if needed
};

const query = `
query {
    repository(owner: "th13vn", name: "th13vn.github.io") {
      discussions(first: 100) {
        # type: DiscussionConnection
        totalCount # Int!
  
        pageInfo {
          # type: PageInfo (from the public schema)
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
  
        nodes {
          url
          title
          publishedAt
          category{
            name
            emojiHTML
          }
          reactions(first: 100){
            nodes {
              id
            }
          }
          comments(first: 100){
            nodes {
              id
            }
          }
        }
      }
    }
}
`;

fetch(graphqlEndpoint, {
  method: 'POST',
  headers,
  body: JSON.stringify({ query }),
})
  .then((response) => response.json())
  .then((data) => {
    let notes = data["data"]["repository"]["discussions"]["nodes"];
    for (let i = 0; i < notes.length; i++) {
      let note = notes[i];
      let htmlString = `
      <div class="note">
          <h2><a class="title" href="${note["url"]}" target="_blank">
                  ${note["category"]["emojiHTML"]} ${note["title"]}
              </a>
          </h2>
          <div class="info">
              <div class="fa fa-hashtag">${note["category"]["name"]?.split(" ")[0]?.toLowerCase()}</div>
              <div class="fa fa-comment">${note["comments"]["nodes"].length}</div>
              <div class="fa fa-heart">${note["reactions"]["nodes"].length}</div>
          </div>
      </div>`
      document.getElementById("notes").innerHTML += htmlString;
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
