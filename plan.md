pages:

- homepage
- sign up page
- profile page
- search page
- settings

routes:

- pages

features:

- creating account
- updating account
- deleting account
- searching wines
- saving wines
- displaying cellar with saved wines
- rating wines

models:

- Wine:
  id
  display-name (string),
  country of origin (string),
  color (string),
  price (string),
  pictureUrl (string)

- User:
  id
  email (string)
  password (string)
  cellar (ref)
  review (ref)

- Cellar:
  id
  userId (ref)
  wineIds (ref)

- Review:
  id
  rating (num 1-5)
  wineId (ref)
  userId (ref)
  comment (string)

technologies:

- Google custom search API
- REACT
- Apollo server
- graphQL
- node
- express
- MongoDB/ mongoose
- REACT-hot-toast
- REACT-icons
- REACT-router-dom
- styled components
- json webtoken
- bcrypt

type Mutation {
addUser(email: String!, password: String!): Auth
// TODO how to add wine specifically to cellar
// TODO how to add revuew specifically to wine
addReview(reviews: [ID]!, rating: Number!): Review
updateUser(email: String, password: String): User
deleteUser(email: String, password: String): User
login(email: String!, password: String!): Auth
}
