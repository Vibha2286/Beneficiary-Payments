class Beneficiary {
  constructor(id, name, bank, bankCode, branchName, branchCode) {
    this.id = id;
    this.name = name;
    this.bank = bank;
    this.bankCode = bankCode;
    this.branchName = branchName;
    this.branchCode = branchCode;
  }

  static fromJson(json) {
    return new Beneficiary(json.id, json.name, json.bank, json.bankCode, json.branchName, json.branchCode);
  }
}

export default Beneficiary;
