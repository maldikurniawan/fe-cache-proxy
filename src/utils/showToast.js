import { Slide, toast } from "react-toastify";

/**
 * Menampilkan pesan toast dengan jenis yang berbeda.
 * @param {string} message - Pesan yang ingin ditampilkan dalam toast.
 * @param {string} [type='info'] - Jenis toast (info, success, warning, error). Default: 'info'.
 * @param {int} time - Waktu Toast dalam satuan ms. Default: '3000'.
 */
export const showToast = (message, type = "info", time = 3000) => {
  const toastConfig = {
    position: "top-center",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
    transition: Slide,
  };

  switch (type) {
    case "success":
      toast.success(message, toastConfig);
      break;
    case "warning":
      toast.warning(message, toastConfig);
      break;
    case "error":
      toast.error(message, toastConfig);
      break;
    default:
      toast.info(message, toastConfig);
      break;
  }
};
