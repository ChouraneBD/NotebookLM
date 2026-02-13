export async function mockGenerateQuestions(topic: string, count: number) {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 2000))

    return [
        {
            question_text: "Which of the following best describes the function of the mitochondria?",
            options: ["Protein synthesis", "Energy production (ATP)", "Photosynthesis", "Cell division"],
            correct_answer: "Energy production (ATP)",
            explanation: "Mitochondria are often referred to as the powerhouse of the cell because they generate most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy."
        },
        {
            question_text: "In the equation E = mc^2, what does 'c' represent?",
            options: ["Energy", "Mass", "Speed of light", "Gravity"],
            correct_answer: "Speed of light",
            explanation: "In Einstein's mass-energy equivalence formula, 'c' stands for the speed of light in a vacuum, which is approximately 3.00 x 10^8 meters per second."
        },
        {
            question_text: "What is the primary product of the Calvin cycle in photosynthesis?",
            options: ["Oxygen", "Carbon dioxide", "G3P (sugar precursor)", "ATP"],
            correct_answer: "G3P (sugar precursor)",
            explanation: "The Calvin cycle takes CO2 and energy from ATP/NADPH to produce Glyceraldehyde-3-phosphate (G3P), which can be converted into glucose and other sugars."
        },
        {
            question_text: "Solve for x: 2x + 5 = 13",
            options: ["3", "4", "5", "6"],
            correct_answer: "4",
            explanation: "Subtract 5 from both sides: 2x = 8. Divide by 2: x = 4."
        },
        {
            question_text: "Which process involves the movement of water across a semi-permeable membrane?",
            options: ["Diffusion", "Active Transport", "Osmosis", "Facilitated Diffusion"],
            correct_answer: "Osmosis",
            explanation: "Osmosis is the specific term for the diffusion of water molecules across a semi-permeable membrane from an area of higher water concentration to an area of lower water concentration."
        }
    ]
}
