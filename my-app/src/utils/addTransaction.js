export function validateAddTransaction(
  transaction,
  amount,
  type,
  setError,
  arrayType
) {
  if (!transaction || !amount || !type) {
    setError("Enter all fields!");
    return;
  } else if (isNaN(amount)) {
    setError("Amount should be a number");
    return;
  } else if (+amount === 0) {
    setError("Amount should not be zero");
    return;
  } else if (+amount < 0) {
    setError("Amount should be a positive value");
    return;
  } else if (!arrayType.includes(type)) {
    setError("Transaction type is not correct");
    return;
  } else {
    return true;
  }
}

export function selectTransaction(
  transaction,
  amount,
  type,
  arrayType,
  creditContext,
  debitContext
) {
  if (type === arrayType[0]) {
    creditContext.addCreditToApi({ transaction, amount });
    return;
  }
  if (type === arrayType[1]) {
    debitContext.addDebitToApi({ transaction, amount });
    return;
  }
}

//convert plural to singular
export const singularForm = (value) => {
  let valueArray = value.split("");
  //delete item
  delete valueArray[valueArray.length - 1];
  return valueArray.join("");
};
