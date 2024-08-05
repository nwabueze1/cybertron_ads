export const createRegistration = `
    mutation($name:String!, $email:String!, $phone_number:String!, $offer_won:String!)
{
  insert_registrations_one(object:{name:$name, email:$email, phone_number:$phone_number, offer_won:$offer_won})
  {
    id
  }
}
`;

export const createUser = `
    mutation($email: String!, $password: String!) {
      insert_users_one(object: {email: $email, password: $password}) {
        id
      }
    }
  `;
