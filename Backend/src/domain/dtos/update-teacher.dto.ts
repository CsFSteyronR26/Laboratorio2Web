export class UpdateTeacherDTO {

    private constructor(
        public readonly name: string,
        public readonly phone: string,
        public readonly email: string,
        public readonly status: boolean
    ) {}

    static create(
        object: { [key: string]: any },
    ): [string | undefined, UpdateTeacherDTO?]{
        const {
            name,
            phone,
            email,
            status
        } = object;

        if(!name) return ["Missing name"];
        if(!phone) return ["Missing phone"];
        if(!email) return ["Missing email"];
        if(!status) return ["Missing status"];

         if(name && name.length > 100)
            return ["name is too large, max length is 100 characters"];

        return [
            undefined,
            new UpdateTeacherDTO(
                name,
                phone,
                email,
                status
            )
        ];

    }

}
