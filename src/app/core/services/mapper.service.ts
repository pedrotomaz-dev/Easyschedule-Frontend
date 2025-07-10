import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapperService {

  constructor() { }

  // Função genérica para mapear dados automaticamente
  mapObjectAuto<T>(data: any): T | T[] {
    // Função auxiliar para mapear um item
    const mapItem = (item: any): T => {
      const mappedItem: any = {};
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          mappedItem[key] = item[key]; // Mapeia a chave de origem para a chave de destino (mesmo nome)
        }
      }
      return mappedItem;
    };

    // Se for um array, mapeia todos os itens
    if (Array.isArray(data)) {
      return data.map(mapItem); // Retorna uma lista mapeada
    }

    // Se for um único objeto, mapeia o objeto
    return mapItem(data); // Retorna o objeto mapeado
  }

}
