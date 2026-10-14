const TEST_TYPES = [
    { key: 'quiz', label: 'Quiz', color: 'bg-blue-600' },
    { key: 'trueFalse', label: "To'g'ri / Noto'g'ri", color: 'bg-green-500' },
    { key: 'code', label: 'Kod savollari', color: 'bg-yellow-400' },
];

function TestTypeSelector({
    value = { quiz: 60, trueFalse: 20, code: 20 },
    onChange,
    disabled = false,
}) {
    const total = TEST_TYPES.reduce(
        (sum, type) => sum + Number(value[type.key] || 0),
        0
    );

    const handleChange = (key, rawValue) => {
        if (rawValue === '') {
            onChange({ ...value, [key]: '' });
            return;
        }

        const number = Number(rawValue);

        if (!Number.isFinite(number) || number < 0 || number > 100) {
            return;
        }

        onChange({ ...value, [key]: number });
    };

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-gray-900">
                Test turlari nisbati
            </h3>

            {TEST_TYPES.map((type) => (
                <div key={type.key} className="flex flex-col gap-2">
                    <label
                        htmlFor={`test-type-${type.key}`}
                        className="text-sm font-medium text-gray-700"
                    >
                        {type.label} (%)
                    </label>

                    <input
                        id={`test-type-${type.key}`}
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        value={value[type.key] ?? ''}
                        disabled={disabled}
                        onChange={(event) =>
                            handleChange(type.key, event.target.value)
                        }
                        className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
                    />
                </div>
            ))}

            <div className="rounded-lg bg-gray-50 p-4">
                <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-gray-700">
                        Umumiy foiz
                    </span>
                    <span
                        className={
                            total === 100
                                ? 'font-semibold text-green-600'
                                : 'font-semibold text-red-600'
                        }
                    >
                        {total}% / 100%
                    </span>
                </div>

                <div className="flex h-3 overflow-hidden rounded-full bg-gray-200">
                    {TEST_TYPES.map((type) => (
                        <div
                            key={type.key}
                            className={`${type.color} transition-all duration-200`}
                            style={{
                                width: `${Math.max(
                                    0,
                                    Math.min(100, Number(value[type.key]) || 0)
                                )}%`,
                            }}
                        />
                    ))}
                </div>

                {total !== 100 && (
                    <p className="mt-2 text-sm text-red-600" role="alert">
                        Test turlari yig'indisi 100% bo'lishi kerak.
                    </p>
                )}
            </div>
        </div>
    );
}

export default TestTypeSelector;