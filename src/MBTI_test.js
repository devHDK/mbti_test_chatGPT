import React, {useEffect, useState} from 'react'

const OPENAI_API_KEY = ''
const OPENAI_MODEL = 'text-davinci-002'


function MBTI_test() {
    const [personalityInput, setPersonalityInput] = useState('')
    const [result, setResult] = useState('')
    const [mbti, setMbti] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(()=>{

        console.log(loading)

    },[loading])

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
                        prompt: `If I explain where I want to go, tell me the detailed description and the city in the form of {"city":", "desc":"} in JSON format. 
                                 \n\n
                                 explain : ${personalityInput} 
                                 `,

                        model: OPENAI_MODEL,
                        max_tokens: 2048,
                    }
                ),
            })
            const mbtiApiResponseJson = await mbtiApiResponse.json()
            console.log(JSON.parse(mbtiApiResponseJson.choices[0].text))

            // 예측된 MBTI 코드에 해당하는 결과와 설명
            const { city, desc, } = JSON.parse(mbtiApiResponseJson.choices[0].text)
            if (city) {
                setMbti(city)
                setResult(`${desc}`)
                setLoading(false)
            } else {
                setMbti('?')
                setResult('알 수 없는 유형입니다 😕')
            }

        } catch (e) {
            console.log(e)
            setLoading(false)
            window.alert('error')
        }

    }

    return (
        <div style={{ marginLeft: '20px' }}>
            <h1>가고싶은 여행지 추천</h1>
            <div>
                <label>가고싶은곳 : </label>
                <input
                    style={{ width: "1000px", }}
                    type="text"
                    id="personalityInput"
                    value={personalityInput}
                    onChange={(e) => setPersonalityInput(e.target.value)}
                />
            </div>
            <div>
                <button style={{ margin: '10px' }} onClick={handleMbtiButtonClick}> {!loading ? '확인' : <span style={{color:'gray'}} > loading... </span>}</button>
            </div>
            <div style={{ width: '800px', height: '800px', overflow: 'auto', margin: '10px' }}>
                {mbti && <div style={{ fontSize: '30px', marginBottom: '10px' }} > {mbti}</div>}
                {result && <div style={{}} >{result}</div>}
            </div>

        </div>
    )
}

export default MBTI_test