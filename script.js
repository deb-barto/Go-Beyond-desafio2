window.onload = function() {
    form = document.getElementById('form')
    tableHere= document.getElementById('tableHere')
    cardBody = document.getElementsByClassName('card-body')[0]

    form.addEventListener('submit',function(e){
        e.preventDefault();
        preçoProduto = parseFloat (document.getElementById('preçoProduto').value)
        vendedor = document.getElementById('vendedor').value
        vendas = document.getElementById('vendas').value
        salarioAntes = parseFloat (document.getElementById('salario').value)
        salario = (salarioAntes + ((preçoProduto * 0.15 )* vendas))
    
        if( preçoProduto == '' || vendedor =='' || vendas =='' ){
            UI.messages('Todos campos devem ser registrados', 'danger')
        } else{
            const item = new itemTable (preçoProduto, vendedor, vendas, salario)
            UI.displayData(item)
            Store.setStored(item)
            UI.clearALL()
            UI.messages('Dados Registrados', 'success')
        }
    })

    tableHere.addEventListener('click',function(e){
       UI.removeRow(e.target)
    })

    class itemTable{
        constructor(preçoProduto, vendedor, vendas, salario) {
            this.preçoProduto = preçoProduto;
            this.vendedor = vendedor;
            this.vendas = vendas;
            this.salario = salario;
        }
    }
    class UI{
        static clearALL(){
            document.getElementById('preçoProduto').value = ''
            document.getElementById('vendedor').value = ''
            document.getElementById('vendas').value = ''
            document.getElementById('salario').value = ''
        }
        static displayData(obj) {
            let itemsFromLocal = Store.getStored()
            itemsFromLocal.push(obj)
            UI.Poplinhas( itemsFromLocal)

        }


        static Poplinhas(item){
           // array
           //limpar a tabela depois de inserir
            while( tableHere.firstChild){
                tableHere.firstChild.remove( tableHere.firstChild)
            }

           item.forEach(onebyone =>{
            tableHere.innerHTML +=`
            <tr>
                 <td>${onebyone.vendedor}</td>
                 <td>${onebyone.vendas}</td>
                 <td>${onebyone.preçoProduto}</td>
                 <td>${onebyone.salario}</td>
                 <td><button class='btn btn-danger removeIt'>X</button></td>
             </tr>
            `
           })
        }

        static messages(txt, className) {
            let divs = '';
            divs = document.createElement('div')
            divs.classList = `alert alert-${className}`
            divs.innerText = txt;
            cardBody.insertBefore(divs,form)
            setTimeout(function() {
                divs.remove()
            }, 3000)
        }

        static removeRow(element){
            if(element.classList.contains('removeIt')){
                 let vendedor = element.parentElement.parentElement.firstElementChild.innerText;
                Store.removeStoreValue(vendedor)
                element.parentElement.parentElement.remove();
            }   

        }
    }
        class Store {
            static getStored(){
                let item = ''
                if (localStorage.getItem('items')==null){
                    item = []
                }else{
                    item = JSON.parse(localStorage.getItem('items'))
                }
                return item
            }
            static setStored(obj){
                let itemsFromLocal = Store.getStored()
                itemsFromLocal.push(obj)
                localStorage.setItem('items', JSON.stringify(itemsFromLocal))
            }
            static removeStoreValue(vendedor){
             let TodosItens = Store.getStored()
             TodosItens.forEach(function(onebyone,index){
                 if(onebyone.vendedor == vendedor){
                    TodosItens.splice(index,1)
                 }
             })  
             localStorage.setItem('items', JSON.stringify(TodosItens))
            }
        }

        UI.Poplinhas(Store.getStored())
}
