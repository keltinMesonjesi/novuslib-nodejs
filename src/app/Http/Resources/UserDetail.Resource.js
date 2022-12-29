/*
|--------------------------------------------------------------------------
| Format returned user detail model data
|--------------------------------------------------------------------------
*/

module.exports = (userDetail) => {
  return {
    firstname: userDetail.firstname,
    lastname: userDetail.lastname,
    phone_number: userDetail.phone_number,
    address: userDetail.address,
  };
};
