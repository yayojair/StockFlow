import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('producto-detail')
export class MyElement extends LitElement {
  @property()
  titulo:string='';

  @property()
  producto: Producto = {
    id: 0,
    nombre: '',
    categoria: '',
    cantidad: 0,
    fecha_compra: '',
    fecha_vencimiento: '',
    fecha_registro: '',
    fecha_modificacion: ''
  }

  private cerrar(){
    this.dispatchEvent(
      new CustomEvent('cerrar',{
        bubbles: true,
        composed: true
      })
    )
  }


  static styles = css`
    .lit-container {
      background-color: #fcfbfa;
      border: 1px solid #d3cfc9;
      border-radius: 6px;
      padding: 1.25rem 1.5rem;
      max-width: 420px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      font-family: monospace, sans-serif;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .card-tag {
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #888;
      font-weight: bold;
    }

    /* Botón transformado para que luzca como texto plano/enlace */
    .close-link {
      background: none;
      border: none;
      padding: 0;
      color: #666;
      font-size: 0.8rem;
      cursor: pointer;
      text-decoration: underline;
    }

    .close-link:hover {
      color: #111;
    }

    .card-title {
      font-size: 1.1rem;
      font-weight: bold;
      color: #2c2c2c;
      margin: 0 0 0.75rem 0;
    }

    .card-divider {
      border-top: 1px dashed #b5ada3;
      margin: 0.5rem 0 1rem 0;
    }

    .card-body {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .field-row {
      display: flex;
      font-size: 0.9rem;
    }

    .field-label {
      font-weight: bold;
      color: #555;
      width: 140px;
      flex-shrink: 0;
    }

    .field-value {
      color: #222;
      word-break: break-all;
    }
  `;

  render(){
    return html `
      <div class="lit-container">
        <div class="card-header">
          <span class="card-tag">Ficha de Inventario</span>
          <button class="close-link" @click="${this.cerrar}">Cerrar</button>
        </div>

        <h2 class="card-title">${this.titulo}</h2>
        
        <div class="card-divider"></div>

        <div class="card-body">
          <div class="field-row">
            <span class="field-label">ID:</span>
            <span class="field-value">${this.producto.id}</span>
          </div>
          <div class="field-row">
            <span class="field-label">Nombre:</span>
            <span class="field-value">${this.producto.nombre}</span>
          </div>
          <div class="field-row">
            <span class="field-label">Categoría:</span>
            <span class="field-value">${this.producto.categoria}</span>
          </div>
          <div class="field-row">
            <span class="field-label">Cantidad:</span>
            <span class="field-value">${this.producto.cantidad }</span>
          </div>
          <div class="field-row">
            <span class="field-label">F. Compra:</span>
            <span class="field-value">${this.producto.fecha_compra}</span>
          </div>
          <div class="field-row">
            <span class="field-label">F. Vencimiento:</span>
            <span class="field-value">${this.producto.fecha_vencimiento}</span>
          </div>
          <div class="field-row">
            <span class="field-label">F. Registro:</span>
            <span class="field-value">${this.producto.fecha_registro}</span>
          </div>
          <div class="field-row">
            <span class="field-label">F. Modificación:</span>
            <span class="field-value">${this.producto.fecha_modificacion}</span>
          </div>
        </div>
      </div>
    `;
  }
}

interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  cantidad: number;
  fecha_compra: string;
  fecha_vencimiento:string;
  fecha_registro:string;
  fecha_modificacion:string;
}