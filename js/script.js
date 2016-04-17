

angular.module('Login', ["ngRoute","firebase"])
.controller('LoginController', ['$scope', function($scope) {

     var myFirebaseRef = new Firebase("https://hackingshop.firebaseio.com/usuarios");
    
    
    $scope.registrar=function(usuario){
         
        myFirebaseRef.child(1).set({
            login: usuario.login
            , senha: usuario.senha
            
        });
    }
    
}])
.controller('cadastroProdutoController', ['$scope','$firebaseArray','$firebaseObject', function($scope,$firebaseArray,$firebaseObject) {
     $scope.myFirebaseRef = new Firebase("https://hackingshop.firebaseio.com/produtos");
   
  
    $scope.proximoIdProduto = function(){
         $scope.proximo = 0;
        var obj = $firebaseObject($scope.myFirebaseRef);
        
        
        obj.$loaded().then(function(){
            
            angular.forEach(obj, function(value,key){
                    
                $scope.proximo+= value.Id;
                
            })
            
        });
        
        $scope.proximo +=1;
        return $scope.proximo;
        while ($scope.id < 1){
            $scope.id = $scopde.id+1;
        }
        
    }
    
    
    $scope.cadastrar=function(produto){
        
        $scope.idNovoProduto =  $scope.proximoIdProduto();
 
         
        $scope.myFirebaseRef.child($scope.id
                                  ).set({
            id:$scope.idNovoProduto,
            tipodoproduto: produto.tipodoproduto,
            codigodebarras: produto.codigodebarras,
            tamanho: produto.tamanho,
            modelo: produto.modelo,
            marca: produto.marca,
            descricao:produto.descricao
            
        });
    }
    
      $scope.listarProdutos=function(produto){
         
        $scope.listaProdutos = $firebaseArray($scope.myFirebaseRef);
    }
    $scope.listarProdutos();
}])

.controller('LogarController',['$scope',function($scope){
    var myFirebaseRef = new Firebase("https://hackingshop.firebaseio.com/usuarios");
        $scope.usuario={
   
        }
        $scope.compare=function(){
            $scope.result = myFirebaseRef.child(1).get($scope.usuario.login);
        }
}]);

