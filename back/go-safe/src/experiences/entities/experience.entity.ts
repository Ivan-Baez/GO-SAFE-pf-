export class Experience {
@OneToMany(() => QAA, (qaa) => qaa.experience)
qaas: QAA[];
}
