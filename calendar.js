class EventList {
    constructor() {
        this.list = [];
    }


    add(nom, description, date) {
        let event = new Event(this.getNextId(), date, nom, description);
        this.list.push(event);
    }


    getEvent(id) {
        this.list.forEach(event => {
            if(event.id == id)
                return event
        })
        return false
    }


    getEventByDate(date) {
        let toReturn = [];
        EventList.forEach(function (event) {
            if(event.date === date)
                toReturn.push(event)
        });
        return toReturn;
    }


    delete(id) {
        let index = this.getIndexOf(id);
        if(index === -1) {
            return false;
        }
        this.list.splice(index,1);
        return true;
    }


    getNextId() {
        if(this.list.length === 0) {
            return 0;
        }
        let lastTodo = this.list[this.list.length-1];
        return lastTodo.id+1;
    }


    getIndexOf(id) {
        let i=0;
        while(i < this.list.length && this.list[i].id !== id) {
            i++;
        }
        return i < this.list.length ? i : -1;
    }


    getAll() {
        return this.list;
    };
}


class Event  {
    constructor(id, date, nom, description) {
        this.id = id;
        this.date = date;
        this.nom = nom;
        this.description = description;
    }
}


module.exports = {
    EventList : EventList,
    Event : Event
};
