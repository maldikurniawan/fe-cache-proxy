import axios from "axios";
import Swal from "sweetalert2";

export const getData = (url, params, reducers, type) => {
  const { dispatch, redux } = reducers;
  dispatch(
    redux({
      type: type,
      payload: {
        loading: true,
        data: false,
        error: false,
      },
    })
  );

  axios({
    method: "GET",
    url: url + params,
  })
    .then((response) => {
      dispatch(
        redux({
          type: type,
          payload: {
            loading: false,
            data: response.data,
            error: false,
          },
        })
      );
    })
    .catch((error) => {
      dispatch(
        redux({
          type: type,
          payload: {
            loading: false,
            data: false,
            error: error.message,
          },
        })
      );
    });
};

// Request post
export const postData = (url, data, reducers, type) => {
  const { dispatch, redux } = reducers;
  dispatch(
    redux({
      type: type,
      payload: {
        loading: true,
        data: false,
        error: false,
      },
    })
  );

  axios({
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
    url: url,
    timeout: 120000,
    data: data,
  })
    .then((response) => {
      Swal.fire({
        icon: "success",
        title: "Good job!",
        customClass: {
          container: "z-[99999]",
        },
        text: response.data.messages,
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(
        redux({
          type: type,
          payload: {
            loading: false,
            data: response.data,
            error: false,
          },
        })
      );
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        customClass: {
          container: "z-[99999]",
        },
        text: error,
      });
      dispatch(
        redux({
          type: type,
          payload: {
            loading: false,
            data: false,
            error: error.message,
          },
        })
      );
    });
};

// Request put
export const putData = (url, data, reducers, type) => {
  const { dispatch, redux } = reducers;
  dispatch(
    redux({
      type: type,
      payload: {
        loading: true,
        data: false,
        error: false,
      },
    })
  );

  axios({
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
    url: url,
    timeout: 120000,
    data: data,
  })
    .then((response) => {
      Swal.fire({
        icon: "success",
        title: "Good job!",
        customClass: {
          container: "z-[99999]",
        },
        text: response.data.messages,
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(
        redux({
          type: type,
          payload: {
            loading: false,
            data: response.data,
            error: false,
          },
        })
      );
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        customClass: {
          container: "z-[99999]",
        },
        text: error,
      });
      dispatch(
        redux({
          type: type,
          payload: {
            loading: false,
            data: false,
            error: error.message,
          },
        })
      );
    });
};

// Request delete
export const deleteData = (url, reducers, type) => {
  const { dispatch, redux } = reducers;
  dispatch(
    redux({
      type: type,
      payload: {
        loading: true,
        data: false,
        error: false,
      },
    })
  );

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#378ecc",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    customClass: {
      container: "z-[99999]",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      axios({
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        url: url,
        timeout: 120000,
      })
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Good job!",
            customClass: {
              container: "z-[99999]",
            },
            text: response.data.messages,
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(
            redux({
              type: type,
              payload: {
                data: response.data,
              },
            })
          );
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            customClass: {
              container: "z-[99999]",
            },
            text: error,
          });
          dispatch(
            redux({
              type: type,
              payload: {
                data: false,
              },
            })
          );
        });
    }
  });
};
