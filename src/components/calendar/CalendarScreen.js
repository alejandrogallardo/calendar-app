import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';

import { Navbar } from '../ui/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventAddNew, eventClearActiveEvent, eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');
const localizer = momentLocalizer(moment);

/*const events = [{
    title: 'Cumple del perro',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    notes: 'Empezar proyecto Banrural',
    user: {
        _id: '123',
        name: 'Alejandro'
    }
}]*/

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    // TODO: Leer del store los eventos
    const { events, activeEvent } = useSelector( state => state.calendar );

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    const onDoubleClick = (e) => {
        dispatch( uiOpenModal() );
    }
    
    const onSelectEvent = (e) => {
        dispatch( eventSetActive(e) );
    }
    
    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e)
    }

    const onSelectSlot = (e) => {
        // console.log(e)
        dispatch( eventClearActiveEvent() );
    }

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        // console.log(event, start, end, isSelected);
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    }

    return (
        <div className="calendar-screen">
            <Navbar />
            
            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                view={ lastView }
                components={{
                    event: CalendarEvent
                }}
            />
            {/* style={{ height: 500 }} */}

            <AddNewFab />

            {
                (activeEvent) && <DeleteEventFab />
            }   

            <CalendarModal />
        </div>
    )
}
