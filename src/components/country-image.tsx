interface Props {
    url: string;
    name: string;
}

export const CountryImage = ({ url, name }: Props) => {
    return (
        <div className="w-full h-28 grid place-items-center overflow-hidden">
            <img
                src={url}
                alt={`Flag of ${name}`}
                className="h-20 rounded-md"
            />
        </div>
    );
}