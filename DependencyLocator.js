class DependencyLocator {
    factories = new Map(); //Map crea un tipo objeto pansandole 
    lazySingletons = new Map();

    static instance;

    constructor(){}

    bindFactory(token, fn) { // agregan una llave y un objeto, le pasan una funcion que almacena
      this.factories.set(token, {type: 'factory', fn}); // se establece un objeto primer propiedad type: valor (factory)
    }
        
    bindLazySingleton (token, fn) { // agregan una llave y un objeto, le pasan una funcion que almacena
       this.factories.set(token, { type: 'LazySingleton', fn});
    }  
     
    static getInstance(){ // para que se cree el singletons
     if (!DependencyLocator.instance) {
        DependencyLocator.instance = new DependencyLocator();
    }
    return DependencyLocator.instance;
    }

    get(token) { // extrae
        const factory = this.factories.get(token);

        if (!factory) {// si no existe
            throw new Error(`Dependency ${token} is not registred`);
        }

        if (factory.type === 'lazySingleton'){// si existe se hace lo siguiente.
            const sigleton = this.lazySingletons.get(token) || factory.fn(); // this.lazySingletons.get(token) extrae de singleton pero no hay nada deginido en ella.
            this.lazySingletons.se(token, sigleton);

            return sigleton;
        }else {
            return factory.fn();
        }
    }

    clear(){
        this.factories.clear();
        this.lazySingletons.clear();
    }
    
}

module.exports = DependencyLocator