export class UpdateClassroomDTO {

    private constructor(
        public readonly code: string,
        public readonly capacity: number,
        public readonly status: boolean
    ) {}

    static create(
        object: { [key: string]: any },
    ): [string | undefined, UpdateClassroomDTO?]{
        const {
            code,
            capacity,
            status
        } = object;

        if(!code) return ["Missing code"];
        if(!capacity) return ["Missing capacity"];
        if(!status) return ["Missing status"];

        if(capacity < 0)
            return ["negative capacity is not possible"];

        return [
            undefined,
            new UpdateClassroomDTO(
                code,
                capacity,
                status
            )
        ];

    }

}
    