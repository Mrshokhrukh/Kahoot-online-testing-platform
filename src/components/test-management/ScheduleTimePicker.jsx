import { useState } from 'react';
import AppInput from '../shared/AppInput';

function ScheduleTimePicker({
    date,
    time,
    onDateChange,
    onTimeChange,
    disabled = false,
}) {
    const [error, setError] = useState('');

    const today = new Date();
    const todayString = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, '0'),
        String(today.getDate()).padStart(2, '0'),
    ].join('-');

    const handleDateChange = (value) => {
        if (value < todayString) {
            setError("O'tgan sanani tanlash mumkin emas.");
            return;
        }

        setError('');
        onDateChange(value);
    };

    const handleTimeChange = (value) => {
        if (date === todayString && value) {
            const now = new Date();
            const selectedMinutes =
                Number(value.split(':')[0]) * 60 +
                Number(value.split(':')[1]);
            const currentMinutes =
                now.getHours() * 60 + now.getMinutes();

            if (selectedMinutes <= currentMinutes) {
                setError("Joriy vaqtdan keyingi vaqtni tanlang.");
                return;
            }
        }

        setError('');
        onTimeChange(value);
    };

    return (
        <div className="flex flex-col gap-4">
            <AppInput
                label="Test sanasi"
                type="date"
                value={date}
                min={todayString}
                onChange={(event) =>
                    handleDateChange(event.target.value)
                }
                disabled={disabled}
                errorMessage={error}
            />

            <AppInput
                label="Boshlanish vaqti"
                type="time"
                value={time}
                onChange={(event) =>
                    handleTimeChange(event.target.value)
                }
                disabled={disabled || !date}
            />

            <p className="text-sm text-gray-600">
                Vaqt zonasi: Asia/Tashkent (UTC+5)
            </p>
        </div>
    );
}

export default ScheduleTimePicker;