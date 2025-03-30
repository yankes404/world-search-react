interface Props {
    url: string;
    name: string;
}

export const CountryImage = ({ url, name }: Props) => {
    return (
        <div className="w-full h-28 rounded-xl bg-neutral-100 border border-neutral-200 shadow-xs grid place-items-center overflow-hidden">
            <img
                src={url}
                alt={`Flag of ${name}`}
                className="h-20 rounded-md shadow"
            />
        </div>
    );
}