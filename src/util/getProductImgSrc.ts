import { ProductImgSrc } from "../util/enums/productImgSrc";
  
  /**
   * Retrieves the image source for a given product ID.
   *
   * This function constructs a key by concatenating the string 'Product' with the provided product ID.
   * It then checks if this key exists in the ProductImgSrc enum. If the key exists, the corresponding
   * image source is returned. If the key does not exist, null is returned.
   *
   * @param {number} id - The ID of the product.
   * @returns {ProductImgSrc | null} - The image source corresponding to the product ID, or null if the key does not exist in the enum.
   */
  export const getProductImgSrc = (id: number): ProductImgSrc | null => {
    const productKey = `Product${id}` as keyof typeof ProductImgSrc;
    return productKey in ProductImgSrc ? ProductImgSrc[productKey] : null;
  };