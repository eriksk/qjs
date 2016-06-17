var Q = function(target){

    var qWhere = function(list, predicate){
        var result = [];
        for (var i = 0; i < list.length; i++) {
            if(predicate(list[i])){
                result.push(list[i]);
            }
        }
        return result;
    };

    var qOrderBy = function(list, selector){
        for (var i = 0; i < list.length - 1; i++) {
            
            for (var j = i + 1; j > 0; j--) {
                var iValue = selector(list[j - 1]);
                var jValue = selector(list[j]);

                if(iValue > jValue){
                    var temp = list[j - 1];
                    list[j - 1] = list[j];
                    list[j] = temp;
                }
            }
        }        

        return list;
    };

    var qReverse = function(list){
        list.reverse();
        return list;
    };

    var qTake = function(list, count){
        var takeCount = count;
        if(list.length < count){
            takeCount = list.length;
        }
        var result = [];
        for (var i = 0; i < takeCount; i++) {
            result.push(list[i]);
        }

        return result;
    };

    var qSkip = function(list, count){
        var takeCount = count;
        if(list.length < count){
            takeCount = list.length;
        }
        var result = [];
        for (var i = count; i < list.length; i++) {
            result.push(list[i]);
        }

        return result;
    };

    var qDistinct = function(list, comparer){
        var result = [];
        for(var i = 0; i < list.length; i++){
            var found = false;
            for(var j = 0; j < result.length; j++){
                if(comparer(list[i], result[j])){
                    found = true;
                    break;
                }
            }
            if(!found){
                result.push(list[i]);
            }
        }
        return result;
    };

    var qAny = function(list, predicate){
        for(var i = 0; i < list.length; i++){
            if(predicate(list[i]))
                return true;
        }
        return false;
    };

    var qMax = function(list, selector){
        if(list.length == 0)
            return 0;
        var max = selector(list[0]);

        for(var i = 0; i < list.length; i++){
            var value = selector(list[i]);
            if(value > max)
                max = value;    
        }
        return max;
    };
    
    var qMin = function(list, selector){
        if(list.length == 0)
            return 0;
        var min = selector(list[0]);

        for(var i = 0; i < list.length; i++){
            var value = selector(list[i]);
            if(value < min)
                min = value;    
        }
        return min;
    };

    var qGroupBy = function(list, keySelector){
        var result = {};

        for(var i = 0; i < list.length; i++){
            var key = keySelector(list[i]);
            if(!result[key]){
                result[key] = [];
            }
            result[key].push(list[i]);
        }

        return result;
    };

    var qContext = function(target){
        target = target || [];

        this.where = function(predicate){
            return qContext(qWhere(target, predicate));
        };

        this.orderBy = function(selector){
            return qContext(qOrderBy(target, selector));
        };

        this.orderByDesc = function(selector){
            return qContext(qReverse(qOrderBy(target, selector)));
        };

        this.reverse = function(){
            return qContext(qReverse(target));
        };

        this.take = function(count){
            return qContext(qTake(target, count));
        };

        this.skip = function(count){
            return qContext(qSkip(target, count));
        };

        this.first = function(){
            if(target.length == 0)
                return null;
            return target[0];
        };

        this.last = function(){
            if(target.length == 0)
                return null;
            return target[target.length - 1];
        };

        this.distinct = function(comparer){
            return qContext(qDistinct(target, comparer));
        };

        // pure functions
        this.any = function(predicate){
            return qAny(target, predicate);
        };
        this.max = function(selector){
            return qMax(target, selector);
        };
        this.min = function(selector){
            return qMin(target, selector);
        };
        this.groupBy = function(keySelector){
            return qGroupBy(target, keySelector);
        };

        // evaluation aliases
        this.q = function(){
            return target;
        };
        this.toList = function(){
            return this.q();
        };
        this.toArray = function(){
            return this.q();
        };
        this.array = function(){
            return this.q();
        };
        this.eval = function(){
            return this.q();
        };

        return this;
    };

    return qContext(target);
};