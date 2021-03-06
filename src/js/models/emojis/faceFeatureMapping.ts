export interface FeatureMapping {
    [index : string] : Array<number>
}

export const faceFeatureMapping : FeatureMapping = {
    leftEye: [
        359,
        467,
        260,
        259,
        257,
        258,
        286,
        414,
        362,
        341,
        256,
        252,
        253,
        254,
        339,
        255,
        263,
        466,
        388,
        387,
        386,
        385,
        384,
        398,
        362,
        382,
        381,
        380,
        374,
        373,
        390,
        249,
        446,
        342,
        445,
        444,
        443,
        442,
        441,
        413,
        464,
        453,
        452,
        451,
        451,
        449,
        448,
        261,
        265,
        353,
        276,
        283,
        282,
        295,
        285,
        417,
        465,
        357,
        250,
        349,
        248,
        347,
        346,
        340,
        330,
        280,
        345,
        372,
        383,
        300,
        293,
        334,
        296,
        336,
        8,
        9,
        23
    ],
    rightEye: [
        156,
        130,
        247,
        30,
        29,
        27,
        28,
        45,
        190,
        243,
        112,
        26,
        22,
        33,
        24,
        110,
        25,
        33,
        246,
        161,
        160,
        159,
        158,
        157,
        173,
        133,
        155,
        154,
        153,
        145,
        144,
        163,
        7,
        226,
        113,
        225,
        224,
        223,
        222,
        221,
        189,
        244,
        233,
        232,
        231,
        230,
        229,
        228,
        31,
        35,
        124,
        46,
        53,
        52,
        65,
        55,
        193,
        245,
        128,
        121,
        120,
        119,
        118,
        117,
        111,
        101,
        50,
        116,
        143,
        156,
        70,
        63,
        105,
        66,
        107,
        8,
        168
    ],
    nose: [
        6,
        351,
        412,
        343,
        277,
        329,
        371,
        358,
        327,
        326,
        2,
        97,
        98,
        129,
        142,
        100,
        47,
        114,
        188,
        122,
        197,
        419,
        299,
        437,
        355,
        429,
        279,
        331,
        294,
        460,
        326,
        462,
        370,
        94,
        141,
        242,
        20,
        99,
        240,
        64,
        102,
        49,
        209,
        126,
        217,
        174,
        196,
        195,
        248,
        456,
        420,
        360,
        278,
        455,
        305,
        290,
        250,
        458,
        461,
        354,
        19,
        125,
        241,
        238,
        60,
        75,
        59,
        235,
        219,
        48,
        131,
        198,
        236,
        3,
        5,
        281,
        363,
        344,
        439,
        289,
        329,
        309,
        459,
        457,
        274,
        1,
        44,
        237,
        239,
        79,
        166,
        115,
        134,
        51,
        4,
        45,
        275,
        220,
        440,
        218,
        438
    ],
    mouth: [
        0,
        267,
        269,
        270,
        409,
        291,
        375,
        321,
        405,
        314,
        17,
        84,
        181,
        91,
        146,
        61,
        185,
        40,
        39,
        37,
        11,
        302,
        303,
        304,
        408,
        206,
        307,
        320,
        404,
        315,
        16,
        85,
        180,
        90,
        77,
        76,
        184,
        74,
        73,
        72,
        12,
        268,
        271,
        272,
        407,
        293,
        325,
        319,
        403,
        318,
        15,
        86,
        179,
        89,
        96,
        62,
        183,
        42,
        41,
        38,
        13,
        312,
        311,
        310,
        415,
        308,
        324,
        316,
        402,
        317,
        14,
        87,
        178,
        88,
        95,
        78,
        191,
        80,
        81,
        82,
        186,
        92,
        165,
        167,
        164,
        393,
        391,
        322,
        410
    ]
};

export interface FeatureScaleFactor {
    [index : string ] : number
}

export const faceFeatureScaleFactor : FeatureScaleFactor = {
    leftEye: 0.6,
    rightEye: 0.6,
    nose: 0.6,
    mouth: 0.5,
};
