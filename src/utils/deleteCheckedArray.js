import Swal from "sweetalert2"
import icondanger from "@/assets/Danger.png"
import iconClose from "@/assets/navbar/icon_close.svg"
import Api from '@/utils/Api'

const deleteCheckedArray = (deleteArray, endpointName, sortedData, fetchFunction, additionalEndpoint) => {

    Swal.fire({
        title:
          "<span class='font-JakartaSans font-medium text-[28px]'>Are you sure want to delete this?</span>",
        html: "<div class='font-JakartaSans font-medium text-sm'>This will delete this data permanently, You cannot undo this action.</div>",
        iconHtml: `<img src="${icondanger}" />`,
        showCloseButton: true,
        closeButtonHtml: `<img src="${iconClose}" class="hover:scale-75"/>`,
        showCancelButton: true,
        buttonsStyling: false,
        cancelButtonText: "Cancel",
        customClass: {
          cancelButton: "swal-cancel-button",
          confirmButton: "swal-confirm-button",
        },
        reverseButtons: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
    })

    .then((result) => {

        if (result.isConfirmed) {

          if(additionalEndpoint) {
            Api.delete(`/${endpointName}/delete_data_${additionalEndpoint}/${deleteArray.value}`)
          } else {
            Api.delete(`/${endpointName}/delete_data/${deleteArray.value}`)
          }

        // deleteArray.value.map((item) => {
        // })
          
        Swal.fire({
              title: "Successfully",
              text: "Data has been deleted.",
              icon: "success",
              showCancelButton: false,
              confirmButtonColor: "#015289",
              showConfirmButton: false,
              timer: 1500,
        })

        if (sortedData.value.length == 1) {
          fetchFunction()
          } else {
          fetchFunction()
        }

        deleteArray.value = []

        } else {
          return
        }

    })

}

export default deleteCheckedArray