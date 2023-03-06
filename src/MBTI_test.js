import React, { useEffect, useState } from 'react'

const OPENAI_API_KEY = ''
const OPENAI_MODEL = 'text-davinci-002'


function MBTI_test() {
    const [presentWeight, setPresentWeight] = useState('')
    const [goalWeight, setGoalWeight] = useState('')
    const [purpose, setPurpose] = useState('')
    const [calories, setCalories] = useState('')
    const [breakfastResult, setBreakfastResult] = useState([])
    const [lunchResult, setLunchResult] = useState([])
    const [dinnerResult, setDinnerResult] = useState([])
    const [snackResult, setSnackResult] = useState([])

    const [loading, setLoading] = useState(false)

    useEffect(() => {

        console.log(loading)

    }, [loading])

    async function handleMbtiButtonClick() {
        // 성격묘사를 ChatGPT API에 전송하여 MBTI 유형 예측
        try {
            setLoading(true)
            const mbtiApiResponse = await fetch('https://api.openai.com/v1/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + OPENAI_API_KEY,
                },
                body: JSON.stringify(
                    {
                        prompt: `Look at the profile and provide diet plan under total ${calories}kcal in the form of {"breakfast":[{"name":"","gram":"","kcal":""}], "lunch":[{"name":"","gram":"","kcal":""}], "dinner":[{"name":"","gram":"","kcal":""}], "snack":[{"name":"","gram":"","kcal":""}] } in JSON format. 
                                 \n\n
                                 profile - presentWeight :${presentWeight}kg, goalWeight: ${goalWeight}kg, perpose: ${purpose}
                                 `,

                        model: OPENAI_MODEL,
                        max_tokens: 2048,
                    }
                ),
            })
            const mbtiApiResponseJson = await mbtiApiResponse.json()
            console.log(JSON.parse(mbtiApiResponseJson.choices[0].text))

            // 예측된 MBTI 코드에 해당하는 결과와 설명
            const { breakfast, lunch, dinner, snack } = JSON.parse(mbtiApiResponseJson.choices[0].text)
            console.log(breakfast)
            console.log(lunch)
            console.log(dinner)
            console.log(snack)

            if (breakfast && breakfast.length > 0) {
                setBreakfastResult(breakfast)
                setLunchResult(lunch)
                setDinnerResult(dinner)
                setSnackResult(snack)
                setLoading(false)
            } else {
                setBreakfastResult([])
                setLunchResult([])
                setDinnerResult([])
                setSnackResult([])
                setLoading(false)
            }

        } catch (e) {
            console.log(e)
            setLoading(false)
            window.alert('error')
        }

    }

    return (
        <div style={{ marginLeft: '20px' }}>
            <h1>식단 추천</h1>
            <div>
                <div>
                    <label>현재 몸무게</label>
                </div>
                <input
                    style={{ width: "200px", }}
                    type="text"
                    id="personalityInput"
                    value={presentWeight}
                    onChange={(e) => setPresentWeight(e.target.value)}
                />
                <div>
                    <label>목표 몸무게</label>
                </div>
                <input
                    style={{ width: "200px", }}
                    type="text"
                    id="personalityInput"
                    value={goalWeight}
                    onChange={(e) => setGoalWeight(e.target.value)}
                />
                <div>
                    <label>목적</label>
                </div>
                <input
                    style={{ width: "200px", }}
                    type="text"
                    id="personalityInput"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                />

                <div>
                    <label>칼로리</label>
                </div>
                <input
                    style={{ width: "200px", }}
                    type="text"
                    id="personalityInput"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                />
            </div>
            <div>
                <button style={{ margin: '10px' }} onClick={handleMbtiButtonClick}> {!loading ? '확인' : <span style={{ color: 'gray' }} > loading... </span>}</button>
            </div>
            <div style={{ width: '800px', height: '1000px', overflow: 'auto', margin: '10px' }}>
                <div>아침</div>
                {breakfastResult && breakfastResult.length > 0 && breakfastResult.map(item => {
                    return (
                        <div> name: {item.name}, gram:{item.gram}, kcal: {item.kcal} </div>
                    )
                })}
                <div style={{ height: ' 10px' }} ></div>
                <div>점심</div>
                {lunchResult && lunchResult.length > 0 && lunchResult.map(item => {
                    return (
                        <div> name: {item.name}, gram:{item.gram}, kcal: {item.kcal} </div>
                    )
                })}
                <div style={{ height: ' 10px' }}></div>
                <div>저녁</div>
                {dinnerResult && dinnerResult.length > 0 && dinnerResult.map(item => {
                    return (
                        <div> name: {item.name}, gram:{item.gram}, kcal: {item.kcal} </div>
                    )
                })}
                <div style={{ height: ' 10px' }} ></div>
                <div>간식</div>
                {snackResult && snackResult.length > 0 && snackResult.map(item => {
                    return (
                        <div> name: {item.name}, gram:{item.gram}, kcal: {item.kcal} </div>
                    )
                })}

            </div>

        </div>
    )
}

export default MBTI_test