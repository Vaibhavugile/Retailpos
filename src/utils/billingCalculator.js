export const calculateBill = ({
  cart = [],
  billDiscount = 0,
  billingSettings = {},
}) => {

  const totalProducts = cart.length;

  const totalQuantity = cart.reduce(
    (sum, item) => sum + Number(item.qty || 0),
    0
  );

  const subtotal = cart.reduce(
    (sum, item) =>
      sum +
      (Number(item.sellingPrice || 0) *
        Number(item.qty || 0)),
    0
  );

  const discount = Math.min(
    Number(billDiscount || 0),
    subtotal
  );

  const taxableAmount =
    subtotal - discount;

  const gstEnabled =
    billingSettings?.gstEnabled ?? false;

  const gstPercentage =
    Number(
      billingSettings?.gstPercentage || 0
    );

  const gst = gstEnabled
    ? taxableAmount * (gstPercentage / 100)
    : 0;

  let grandTotal =
    taxableAmount + gst;

  if (billingSettings?.roundOff) {
    grandTotal = Math.round(grandTotal);
  }

  return {

    totalProducts,

    totalQuantity,

    subtotal,

    discount,

    taxableAmount,

    gstPercentage,

    gst,

    grandTotal,

  };

};