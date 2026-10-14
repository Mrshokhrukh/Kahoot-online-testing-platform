import { useState, useEffect, useMemo } from 'react'
import { mockTestList } from '../../mocks/testsMock'
import { useTestStore } from '../../store/testStore'

export default function useTestList() {
    const testList = useTestStore((state) => state.testList)
    const setTestList = useTestStore((state) => state.setTestList)
    const [activeTab, setActiveTab] = useState('all') // 'all' | 'scheduled' | 'active' | 'completed'
    const [isLoading, setIsLoading] = useState(true)
    const [loadError, setLoadError] = useState(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            try {
                if (testList.length === 0) setTestList(mockTestList)
            } catch {
                setLoadError("Testlarni yuklashda xatolik yuz berdi")
            } finally {
                setIsLoading(false)
            }
        }, 500)
        return () => clearTimeout(timer)
    }, [setTestList, testList.length])

    const filteredList = useMemo(
        () => (activeTab === 'all' ? testList : testList.filter((t) => t.status === activeTab)),
        [testList, activeTab]
    )

    return { testList, filteredList, activeTab, setActiveTab, isLoading, loadError }
}
