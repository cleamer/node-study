module.exports = {
  // 2XXX : Success
  SUCCESS: { isSuccess: true, code: 2000, message: 'Successed' },

  // 3XXX : Redirection

  // 4XXX : Client Error
  EMPTY_ID: { isSuccess: true, code: 3000, message: 'ID is required.' },
  EMPTY_PASSWORD: { isSuccess: true, code: 3001, message: 'Password is required.' },
  EMPTY_NAME: { isSuccess: true, code: 3002, message: 'User name is required.' },
  EMPTY_NICKNAME: { isSuccess: true, code: 3003, message: 'User nickname is required.' },
  EMPTY_ADDRESSIDX: { isSuccess: true, code: 3004, message: 'AddressIdx is required.' },
  EMPTY_ADDRESSTYPE: { isSuccess: true, code: 3005, message: 'Address type is required.' },
  EMPTY_INFO_TO_UPDATE: { isSuccess: true, code: 3006, message: 'There is no info to update.' },
  EMPTY_TITLE: { isSuccess: true, code: 3007, message: 'Title is required.' },
  EMPTY_CATEGORYIDX: { isSuccess: true, code: 3008, message: 'CategoryIdx is required.' },
  EMPTY_CONTENT: { isSuccess: true, code: 3009, message: 'Content is required.' },
  EMPTY_SEARCH_RANGE: { isSuccess: true, code: 3010, message: 'Range is required.' },

  LENGTH_ID: { isSuccess: true, code: 3007, message: 'User ID should be shorter then 20 charaters.' },
  LENGTH_PASSWORD: { isSuccess: true, code: 3008, message: 'User password should be longer than 6 and shorter then 20 charaters.' },
  LENGTH_NAME: { isSuccess: true, code: 3009, message: 'User name should be shorter then 24 charaters.' },
  LENGTH_NICKNAME: { isSuccess: true, code: 3010, message: 'User name should be shorter then 24 charaters.' },
  LENGTH_PHOTO: { isSuccess: true, code: 3010, message: 'Photos can be uploaded less than 10 photos' },

  REDUNDANT_ID: { isSuccess: false, code: 4001, message: 'It is a redundant ID.' },
  REDUNDANT_NICKNAME: { isSuccess: false, code: 4002, message: 'It is a redundant nickname.' },

  OUT_OF_RANGE_ADDRESSIDX: { isSuccess: false, code: 4003, message: 'It is not in range of addressIdx.' },
  OUT_OF_RANGE_ADDRESSTYPE: { isSuccess: false, code: 4004, message: "Address type should be 'address' or 'subAddress'." },
  OUT_OF_RANGE_USER_STATUS: { isSuccess: false, code: 4005, message: 'It is not in list of user status.' },
  OUT_OF_RANGE_SEARCH_RANGE: { isSuccess: false, code: 4006, message: 'Range should be 1 or 2 or 3.' },
  OUT_OF_RANGE_CATEGORYIDX: { isSuccess: false, code: 4007, message: 'CategoryIdx is out of range.' },
  OUT_OF_RANGE_PRICE: { isSuccess: false, code: 4008, message: 'Price can not be a negative number.' },

  NOT_EXIST_ID: { isSuccess: false, code: 4005, message: 'This ID is not exist.' },
  NOT_EXIST_PRODUCT: { isSuccess: false, code: 4006, message: 'This product is not exist.' },

  USER_STATUS_INACTIVE: { isSuccess: false, code: 4006, message: 'This account is inactive.' },
  USER_STATUS_WITHDRAWAL: { isSuccess: false, code: 4007, message: 'This account has been withdrawn.' },

  PRODUCT_STATUS_NOT_ON_SALE: { isSuccess: false, code: 4008, message: 'This product is not on sale.' },
  PRODUCT_STATUS_DELETED: { isSuccess: false, code: 4009, message: 'This product is deleted.' },
  PRODUCT_STATUS_SOLD_OUT: { isSuccess: false, code: 4010, message: 'This product is sold out.' },

  NOT_MATCHED_TOKEN_ID: { isSuccess: false, code: 4008, message: 'Tocken and user ID are not matched.' },
  NOT_MATCHED_PASSWORD: { isSuccess: false, code: 4009, message: "It's wrong password." },
  NOT_MATCHED_PRODUCT_WRITER_ID: { isSuccess: false, code: 4009, message: "It is not writer's ID" },

  SAME_PASSWORD: { isSuccess: false, code: 4010, message: "It's the same password." },
  SAME_STATUS: { isSuccess: false, code: 4011, message: "It's the same status." },
  SAME_CATEGORYIDX: { isSuccess: false, code: 4011, message: "It's the same categoryIdx." },

  // 5XXX : Server rror
  DB_ERROR: { isSuccess: false, code: 5000, message: 'Database Error' },
  SERVER_ERROR: { isSuccess: false, code: 5001, message: 'Server Error' },
};
