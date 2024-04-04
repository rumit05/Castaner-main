// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

// Use JSDoc annotations for type safety
/**
* @typedef {import("../generated/api").RunInput} RunInput
* @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
* @typedef {import("../generated/api").Target} Target
* @typedef {import("../generated/api").ProductVariant} ProductVariant
*/

/**
 * @type {FunctionRunResult}
 */
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const getmetafield = input.cart.buyerIdentity?.customer?.metafield?.value

  if (getmetafield) {
    const targets = input.cart.lines
      .map(line => {
        const variant = /** @type {ProductVariant} */ (line.merchandise);
        return /** @type {Target} */ ({
          productVariant: {
            id: variant.id
          }
        });
      });
    return {
      discounts: [
        {
          targets,
          value: {
            percentage: {
              value: getmetafield
            }
          },
        }
      ],
      discountApplicationStrategy: DiscountApplicationStrategy.First
    };

  }
  return EMPTY_DISCOUNT;
};
