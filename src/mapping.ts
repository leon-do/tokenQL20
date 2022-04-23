import { Address } from "@graphprotocol/graph-ts";
import { ERC20, Transfer, Approval } from "../generated/ERC20/ERC20";
import { TokenEntity, ApprovalEntity } from "../generated/schema";

export function handleTransfer(event: Transfer): void {
  saveToken(event.address, event.params.from);
  saveToken(event.address, event.params.to);
}

export function handleApproval(event: Approval): void {
  let id = event.address.toHex() + "/" + event.params.owner.toHex() + "/" + event.params.spender.toHex();
  let entity = ApprovalEntity.load(id);
  if (!entity) {
    entity = new ApprovalEntity(id);
    entity.contract = event.address;
  }
  entity.owner = event.params.owner;
  entity.spender = event.params.spender;
  entity.value = event.params.value;
  entity.save();
}

function saveToken(contractAddress: Address, owner: Address): void {
  let erc20 = ERC20.bind(contractAddress);
  let id = contractAddress.toHex() + "/" + owner.toHex();
  let entity = TokenEntity.load(id);
  if (!entity) {
    entity = new TokenEntity(id);
    entity.owner = owner;
    let contract = contractAddress;
    entity.contract = contract;
    let name = erc20.try_name();
    entity.name = name.reverted ? null : name.value;
    let symbol = erc20.try_symbol();
    entity.symbol = symbol.reverted ? null : symbol.value;
    let decimals = erc20.try_decimals();
    entity.decimals = decimals.reverted ? 18 : decimals.value;
  }
  let balance = erc20.try_balanceOf(owner);
  entity.balance = balance.reverted ? null : balance.value;
  let totalSupply = erc20.try_totalSupply();
  entity.totalSupply = totalSupply.reverted ? null : totalSupply.value;
  entity.save();
}
