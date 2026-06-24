import { isValidStellarAddress, normalizeStellarAddress } from './stellarAddress';

export function truncateAddress(value: string, prefixLength = 6, suffixLength = 4): string {
  if (!value) {
    return '';
  }

  const normalizedValue = normalizeStellarAddress(value);
  if (!isValidStellarAddress(normalizedValue)) {
    return value;
  }

  if (normalizedValue.length <= prefixLength + suffixLength + 3) {
    return normalizedValue;
  }

  return `${normalizedValue.slice(0, prefixLength)}...${normalizedValue.slice(-suffixLength)}`;
}
