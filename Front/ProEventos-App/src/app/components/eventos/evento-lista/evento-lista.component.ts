import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {
  public get eventoService(): EventoService {
    return this._eventoService;
  }
  public set eventoService(value: EventoService) {
    this._eventoService = value;
  }

  modalRef?: BsModalRef;

  public eventos: Evento[] = []
  public eventosFiltrados: Evento[] = []
  public exibirImagem = true
  private _filtroLista: string = ''

  public get filtroLista(){
    return this._filtroLista
  }

  public set filtroLista(value: string) {
    this._filtroLista = value
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos
  }

  public filtrarEventos(filtrarPor: string) : Evento[]{
    filtrarPor = filtrarPor.toLocaleLowerCase()
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(
    private _eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
    ) { }

  public ngOnInit(): void {
    //this.spinner.show();
    this.getEventos();
  }

  public alterarImagem(): void{
    this.exibirImagem = !this.exibirImagem
  }

  public getEventos(): void{
    this.eventoService.getEventos().subscribe(
      (_eventos: Evento[]) => {
        this.eventos = _eventos
        this.eventosFiltrados = this.eventos
      },
      error => {
        //this.spinner.hide()
        this.toastr.error('Erro ao Carregar os eventos', 'Error')
      },

    )
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('realizado com sucesso!', 'Deletado!');
  }

  decline(): void {
    this.modalRef?.hide();
  }

  detalheEvento(id: number): void{
    this.router.navigate([`eventos/detalhe/${id}`]);
  }

}
