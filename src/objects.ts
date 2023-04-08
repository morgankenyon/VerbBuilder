interface Tense {
    first_singular: string,
    second_singular: string,
    third_singular: string,
    first_plural: string,
    second_plural: string,
    third_plural: string
}

interface Verb {
    verb: string,
    meaning: string,
    present_participle: string,
    past_participle: string,
    present_tense: Tense
}

interface VerbPack {
    language: string,
    verbs: Verb[]
}