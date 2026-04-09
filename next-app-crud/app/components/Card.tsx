type cardPropsType = {
    title: string,
    description: string
}

export default function Card({ title, description }: cardPropsType) {
    return <>

        <a
            href="#"
            className="group block max-w-sm p-6 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:-translate-y-0.5"
        >
            <h5 className="mb-3 text-2xl font-semibold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors leading-8">
                {title}
            </h5>
            <p className="text-gray-600 leading-relaxed">
                {description}</p>
        </a>


    </>
}