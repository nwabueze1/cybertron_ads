export const createRegistration = `
    mutation($name:String!, $email:String!, $phone_number:String!, $offer_won:String!)
{
  insert_Spin_Registrations_one(object:{name:$name, email:$email, phone_number:$phone_number, offer_won:$offer_won})
  {
    name
    id
  }
}
`;
