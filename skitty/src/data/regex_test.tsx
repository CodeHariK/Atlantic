type TelTestProps = {
    pattern: RegExp;
};

export function TelTest(props: TelTestProps) {
    const telNumbers = [
        "123",
        "+123",
        ".123",
        "123-",
        "123-45",
        "123-45.",
        "123-45-2",
        "123.2",
        "123.2.5",
        "123.2..5",
        "123-452-2",
        "+123456789",
        "123-456-7890",
        "(123) 456-7890",
        "123/456.7890",
        "+1(234)567-8901"
    ];

    return (
        <div class="m-4 ">
            <h6>Pattern: {props.pattern.toString()} </h6>
            <div>
                {
                    telNumbers.map((input) => (
                        <p>
                            {
                                props.pattern.test(input)
                                    ? `Valid phone number: ${input}`
                                    : `Invalid phone number: ${input}`
                            }
                        </p>
                    ))
                }
            </div>
        </div>
    );
}