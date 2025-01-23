const accounts = [
    { id: '1234', balance: 5000 },
    { id: '5678', balance: 2000 },
  ];
  
  async function getAccountById(accountId) {
    return accounts.find(account => account.id === accountId);
  }
  
  async function updateAccount(accountId, updatedAccountData) {
    const accountIndex = accounts.findIndex(account => account.id === accountId);
    if (accountIndex !== -1) {
      accounts[accountIndex] = updatedAccountData;
    }
  }
  
  module.exports = { getAccountById, updateAccount };
  