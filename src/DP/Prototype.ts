namespace Prototype {
    abstract class Monster {
        private id: string;
        abstract type: string;

        abstract draw(): void;
        getType(): string {
            return this.type;
        }
        getId(): string {
            return this.id;
        }
        setId(id: string): void {
            this.id = id;
        }
        clone(): Monster {
            //     var _obj: any = {};
            //     for (var key in this) {
            //         if (this.hasOwnProperty(key)) {
            //             var element = this[key];
            //             if (typeof element == 'string') {
            //                 Reflect.defineProperty(_obj, key, { value: element });
            //             }
            //         }
            //     }
            //     Reflect.setPrototypeOf(_obj,Reflect.getPrototypeOf(this));
            //     return <Monster>_obj;
            return <Monster>new Tool().clone(this);
        }
    }

    class Sheep extends Monster {
        type: string;
        constructor() {
            super();
            this.type = 'Sheep';
        }
        draw(): void {
            console.log(`im a ${this.type}`)
        }
    }

    class Cow extends Monster {
        constructor() {
            super();
            this.type = 'Cow';
        }
        type: string;
        draw(): void {
            console.log(`im a ${this.type}`)
        }

    }

    class MonsterCache {
        private static hashTable = new Map<string, Monster>();

        public static getMonster(id: string): Monster | undefined {
            let monster = this.hashTable.get(id);
            if (monster != undefined)
                return <Monster>monster.clone();;
        }

        public static loadCache(): void {
            var cow = new Cow();
            cow.setId('1');
            this.hashTable.set(cow.getId(), cow);
            var sheep = new Sheep();
            sheep.setId('2');
            this.hashTable.set(sheep.getId(), sheep);
        }
    }

    MonsterCache.loadCache();
    var monster1 = <Monster>MonsterCache.getMonster('1')
    var monster2 = <Monster>MonsterCache.getMonster('2')

    monster1.draw();
    monster2.draw();
}


/**
 * 原型模式属于创建模式的一种
 * 1,首先创建一个抽象父类的容器,用于保存子类的实例(只保存不同的子类实例) 例如 Animal= [subMoneky,subChicken,subCow,];
 * 2,使用的时候通过索引去抽象父类容器去寻找对应的 子类, 找到子类以后再深度拷贝并返回该子类
 * 3,适用场景,用于频繁创建多个子类,而每个相同的子类互不影响
 */