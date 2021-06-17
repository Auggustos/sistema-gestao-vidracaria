import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable()
export class DialogService {
 
  
  showWarning(msg: string, title: string = 'Atenção!') {
    this.closeAll();

    return Swal.fire({ title: title, text: msg, type: 'warning', confirmButtonColor: '#ffbf00' });
  }

  showWarningWithHtml(msg: string, title: string = 'Atenção!') {
    this.closeAll();

    return Swal.fire({ title: title, html: msg, type: 'warning', confirmButtonColor: '#ffbf00' });
  }

  showError(msg: string, title: string = 'Erro!') {
    this.closeAll();

    return Swal.fire({ title: title, text: msg, type: 'error', confirmButtonColor: '#d10000' });
  }

  showSuccess(msg: string, title: string = 'Sucesso') {
    this.closeAll();

    return Swal.fire({ title: title, text: msg, type: 'success', confirmButtonColor: '#44b8b5' });
  }

  showSuccessWithHtml(msg: string, title: string = 'Sucesso!') {
    this.closeAll();

    return Swal.fire({ title: title, html: msg, type: 'success', confirmButtonColor: '#44b8b5' });
  }

  showConfirm(title: string , text: string,  confirmButtonText = 'Sim',
  cancelButtonText = 'Não', confirmButtonColor = '#287f7c', showCancelButton =  true){

    return Swal.fire({ title: title, text: text, type: 'question', reverseButtons: true, showCancelButton: showCancelButton, confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText, confirmButtonColor: confirmButtonColor});
  }

  showLoading() {
    this.closeAll();

    Swal.fire({
      html: '<img src="assets/icons/icone-sigelu-principal.svg" class="sigelu-icone-loading">' +
        '<h2 class="swal2-title" id="swal2-title"><font color="white">Carregando...</font></h2>',
      background: 'transparent',
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false
    });
  }

  showDownload() {
    this.closeAll();

    Swal.fire({
      html: '<img src="assets/icons/icone-sigelu-principal.svg" class="sigelu-icone-loading">' +
        '<h2 class="swal2-title" id="swal2-title"><font color="white">Baixando...</font></h2>',
      background: 'transparent',
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false
    });
  }

  showExportCSV() {
    this.closeAll();
    return Swal.fire({
      titleText: 'Exportar CSV', title: 'left', text: `Deseja exportar uma planilha CSV de acordo com
  os filtros aplicados ?`,
      showCancelButton: true, cancelButtonColor: '#ABB2B9', cancelButtonText: 'Cancelar',
      showConfirmButton: true, confirmButtonColor: '#44b8b5', confirmButtonText: 'Exportar'
    })
  }

  showExportSucess() {
    this.closeAll();
    return Swal.fire({
      title: '', text: 'CSV exportado de acordo com os filtros aplicados.', type: "success",
      showConfirmButton: true, confirmButtonColor: '#44b8b5'
    })
  }

  showExportSucessCSVnoFilter() {
    this.closeAll();
    return Swal.fire({
      title: 'Sucesso', text: 'CSV exportado', type: "success",
      showConfirmButton: true, confirmButtonColor: '#44b8b5'
    })
  }

  closePopup(){
    this.closeAll();
  }

  closeAll() { try { Swal.close(); } catch (error) { } }
}
